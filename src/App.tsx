import { useEffect, useState } from "react";
import "./App.css";
import ConfigJSON from "../public/scripts/config.json";

type TOperations = {
  groupName: string;
  groupList: Array<{ path: string; name: string }>;
};

const App = () => {
  const localhostDomain = `${location.origin}/scripts`;

  const [operationsList, setOperationsList] = useState<Array<TOperations>>([]);

  const getConfig = () => {
    setOperationsList(ConfigJSON);
  };

  const getScript = async (path: string) => {
    let fetchUrl = localhostDomain;

    const res = await fetch(fetchUrl + path);
    return await res.text();
  };

  const itemOnClick = async (path: string) => {
    const scriptToInject = await getScript(path);

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

  useEffect(() => getConfig(), []);

  return (
    <div className="App">
      <div>
        {operationsList?.length > 0 &&
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
        {operationsList?.length <= 0 && <p>No config.json file found</p>}
      </div>
      <div className="text-sm mt-[10rem]">
        built by{" "}
        <a
          className="text-blue-400"
          target="_blank"
          href="https://github.com/junwei99"
        >
          junwei
        </a>{" "}
      </div>
    </div>
  );
};

export default App;
