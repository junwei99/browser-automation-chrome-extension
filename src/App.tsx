import { useEffect, useState, useRef, useReducer } from "react";
import "./App.css";
import Section from "./components/Section";
import ConfigJSON from "./assets/scripts/config.json";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import { debounce } from "./utils/debounce";

type TOperations = {
  groupName: string;
  groupList: Array<{ path: string; name: string }>;
};

type TDevModeState = {
  isDevMode: boolean;
  inputDisabled: boolean;
  endpoint: string;
};

const App = () => {
  console.log({ storage: chrome.storage });
  // const defaultDomain = "http://127.0.0.1:5500/bookmarklet";
  const localhostDomain = `${location.origin}/scripts`;

  const [operationsList, setOperationsList] = useState<Array<TOperations>>([]);
  const [operationListIsLoading, setOperationsListIsLoading] = useState(false);

  const devModeReducer = (
    state: TDevModeState,
    action: {
      type: string;
      value?: Partial<Omit<TDevModeState, "inputDisabled">>;
    }
  ): TDevModeState => {
    switch (action.type) {
      case "init":
        if (!action?.value) throw new Error("No value provided for endpoint");
        return {
          endpoint: action.value?.endpoint ?? "",
          isDevMode: action.value?.isDevMode ?? false,
          inputDisabled: !action.value?.isDevMode,
        };
      case "on":
        return { ...state, isDevMode: true, inputDisabled: false };
      case "off":
        return { ...state, isDevMode: false, inputDisabled: true };
      case "set endpoint":
        if (!action?.value) throw new Error("No value provided for endpoint");
        return { ...state, endpoint: action.value?.endpoint ?? "" };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [devModeState, dispatchDevModeState] = useReducer(devModeReducer, {
    isDevMode: false,
    inputDisabled: true,
    endpoint: "",
  });

  const getScript = async (isDevMode: boolean, path: string) => {
    let fetchUrl = localhostDomain;

    if (isDevMode) {
      fetchUrl = devModeState.endpoint;
    }

    const res = await fetch(fetchUrl + path);
    return await res.text();
  };

  const itemOnClick = async (path: string) => {
    const scriptToInject = await getScript(devModeState.isDevMode, path);

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

  const fetchConfigList = (endpoint: string) => {
    console.log("fetching", endpoint);
    setOperationsListIsLoading(true);
    fetch(endpoint + "/config.json", {
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

  const getConfig = (isDevMode: boolean, endpoint?: string) => {
    if (isDevMode && endpoint) {
      fetchConfigList(endpoint);
    } else {
      setOperationsList(ConfigJSON);
    }
  };

  const toggleDevMode = () => {
    const toSetForDev = !devModeState.isDevMode;

    if (toSetForDev) {
      getConfig(true, devModeState.endpoint);
      dispatchDevModeState({ type: "on" });
    } else {
      getConfig(false);
      dispatchDevModeState({ type: "off" });
    }
  };

  const endpointOnChange = (endpoint: string) => {
    dispatchDevModeState({ type: "set endpoint", value: { endpoint } });
    debounce(() => fetchConfigList(endpoint))();
  };

  const initialLoaded = useRef(false);

  //fix first load problem
  useEffect(() => {
    if (initialLoaded.current) {
      return;
    }

    getConfig(devModeState.isDevMode ? true : false);

    initialLoaded.current = true;
  }, [devModeState.isDevMode]);

  useEffect(() => {
    chrome.storage.sync.get(["devModeState"], (result) => {
      console.log({ result });
      if (result?.devModeState) {
        dispatchDevModeState({ type: "init", value: result.devModeState });
      }
    });
  }, []);

  const skipRef = useRef(true);

  useEffect(() => {
    if (!skipRef.current) {
      chrome.storage.sync.set({ devModeState: devModeState });
    }

    skipRef.current = false;
  }, [devModeState]);

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
            <Checkbox
              onChange={() => toggleDevMode()}
              checked={devModeState.isDevMode}
            />
          </div>
        </Section>
        <Section text="Endpoint URL">
          <Input
            placeholder="Enter endpoint URL"
            onChange={(e) => endpointOnChange(e.target.value)}
            value={devModeState.endpoint}
            disabled={devModeState.inputDisabled}
          />
        </Section>
      </div>
    </div>
  );
};

export default App;
