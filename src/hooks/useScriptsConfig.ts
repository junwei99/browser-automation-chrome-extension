import { useEffect, useReducer } from "react";

type TScriptsConfig = {
  dataIsFromServer: boolean;
  inputDisabled: boolean;
  endpoint: string;
};

export const useScriptsConfig = () => {
  const scriptsConfigReducer = (
    state: TScriptsConfig,
    action: {
      type: string;
      value?: Partial<Omit<TScriptsConfig, "inputDisabled">>;
    }
  ): TScriptsConfig => {
    switch (action.type) {
      case "init":
        if (!action?.value) throw new Error("No value provided for endpoint");
        return {
          endpoint: action.value?.endpoint ?? "",
          dataIsFromServer: action.value?.dataIsFromServer ?? false,
          inputDisabled: !action.value?.dataIsFromServer,
        };
      case "on":
        return { ...state, dataIsFromServer: true, inputDisabled: false };
      case "off":
        return { ...state, dataIsFromServer: false, inputDisabled: true };
      case "set endpoint":
        if (!action?.value) throw new Error("No value provided for endpoint");
        return { ...state, endpoint: action.value?.endpoint ?? "" };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [scriptsConfig, dispatchScriptsConfig] = useReducer(
    scriptsConfigReducer,
    {
      dataIsFromServer: false,
      inputDisabled: true,
      endpoint: "",
    }
  );

  useEffect(() => {
    chrome.storage.sync.set({ scriptsConfig });
  }, [scriptsConfig]);
};
