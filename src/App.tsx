import { useEffect, useState, useReducer, useRef } from "react";
import "./App.css";
import Section from "./components/Section";
import ConfigJSON from "./assets/scripts/config.json";

type TOperations = {
  groupName: string;
  groupList: Array<{ path: string; name: string }>;
};

type TDevMode = {
  isDevMode: boolean;
  inputDisabled: boolean;
  endpoint: string;
};

const App = () => {
  const defaultDomain = "http://127.0.0.1:5500/bookmarklet";
  const localhostDomain = `${location.origin}/scripts`;

  const [operationsList, setOperationsList] = useState<Array<TOperations>>([]);
  const [operationListIsLoading, setOperationsListIsLoading] = useState(false);

  const devModeReducer = (state: TDevMode, action: { type: string }) => {
    if (action.type === "on") {
      return { ...state, isDevMode: true, inputDisabled: false };
    } else if (action.type === "off") {
      return { ...state, isDevMode: false, inputDisabled: true };
    }
    throw new Error("Invalid action type");
  };

  const [devModeState, dispatchDevMode] = useReducer(devModeReducer, {
    isDevMode: false,
    inputDisabled: true,
    //iniital value but can be resetted
    endpoint: defaultDomain + "/config.json",
  });

  const getScript = async (path: string) => {
    const res = await fetch(localhostDomain + path);
    return await res.text();
  };

  const itemOnClick = async (path: string) => {
    const scriptToInject = await getScript(path);

    console.log({ scriptToInject });

    const [tab] = await chrome.tabs.query({
      currentWindow: true,
      active: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id as number },
      func: (scriptToInject) => {
        const script = document.createElement("script");
        script.text = scriptToInject;
        document.documentElement.appendChild(script);
        console.log({ script });
        script.remove();
      },
      args: [scriptToInject],
      world: "MAIN",
    });
  };

  const fetchConfigList = () => {
    setOperationsListIsLoading(true);
    fetch(defaultDomain + "/config.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOperationsList(res);
        setOperationsListIsLoading(false);
      })
      .catch((error) => {
        console.error("fetch error: " + error.message);
        setOperationsList([]);
        setOperationsListIsLoading(false);
      });
  };

  const getConfig = (isDevMode: boolean) => {
    if (isDevMode) {
      fetchConfigList();
    } else {
      setOperationsList(ConfigJSON);
    }
  };

  const toggleDevMode = () => {
    const toSetForDev = !devModeState.isDevMode;

    if (toSetForDev) {
      getConfig(true);
      dispatchDevMode({ type: "on" });
    } else {
      getConfig(false);
      dispatchDevMode({ type: "off" });
    }
  };

  const initialLoaded = useRef(false);

  useEffect(() => {
    if (initialLoaded.current) {
      return;
    }

    if (devModeState.isDevMode) {
      getConfig(true);
      initialLoaded.current = true;
    } else if (!devModeState.isDevMode) {
      getConfig(false);
      initialLoaded.current = true;
    }
  }, [devModeState.isDevMode]);

  return (
    <div className="App">
      <div>
        {operationListIsLoading && <p>Loading...</p>}
        {!operationListIsLoading &&
          operationsList?.length > 0 &&
          operationsList.map((ops) => (
            <div key={ops.groupName}>
              <h1 className="text-lg">{ops.groupName}</h1>
              <ul>
                {ops.groupList.map((groupItem) => (
                  <li
                    key={groupItem.name}
                    onClick={() => itemOnClick(groupItem.path)}
                    className="text-sm my-5 text-blue-200 cursor-pointer"
                  >
                    {groupItem.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {!operationListIsLoading && operationsList?.length <= 0 && (
          <p>No config.json file found</p>
        )}
      </div>
      <div className="border-t-[1px] mt-10 mx-[-50%]"></div>
      <h3 className="text-lg font-bold my-5">Dev Settings:</h3>
      <div className="flex flex-col gap-5">
        <Section text="Dev mode">
          <div className="flex justify-start">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => toggleDevMode()}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </Section>
        <Section text="Endpoint URL">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter endpoint URL"
            value={devModeState.endpoint}
            disabled={devModeState.inputDisabled}
          />
        </Section>
      </div>
    </div>
  );
};

export default App;
