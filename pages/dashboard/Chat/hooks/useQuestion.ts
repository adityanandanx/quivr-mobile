import { useEffect, useState } from "react";
import { useSupabase } from "../../../../providers/supabase-provider";
import { useBrainConfig } from "../../../../lib/context/BrainConfigProvider/hooks/useBrainConfig";
import localStorage from "../../../../lib/localStorage";
import { useAxios } from "../../../../lib/useAxios";
import * as NavigationService from "react-navigation-helpers";

export const useQuestion = () => {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<Array<[string, string]>>([]);
  const [isPending, setIsPending] = useState(false);
  const { session } = useSupabase();
  const { axiosInstance } = useAxios();
  const {
    config: { maxTokens, model, temperature },
  } = useBrainConfig();
  if (session === null) {
    NavigationService.navigate("Login");
  }

  useEffect(() => {
    // Check if history exists in local storage. If it does, fetch it and set it as history
    (async () => {
      try {
        const localHistory = await localStorage.load({ key: "history" });
        if (localHistory) {
          setHistory(JSON.parse(localHistory));
        }
      } catch (error) {
        localStorage.save({ key: "history", data: [] });
      }
    })();
  }, []);

  const askQuestion = async () => {
    if (question.trim().length === 0 || isPending) {
      return;
    }
    setHistory((hist) => [...hist, ["user", question]]);
    setIsPending(true);

    const response = await axiosInstance.post(`/chat/`, {
      model,
      question,
      history,
      temperature,
      max_tokens: maxTokens,
    });
    setHistory(response.data.history);
    localStorage.save({
      key: "history",
      data: JSON.stringify(response.data.history),
    });
    setQuestion("");
    setIsPending(false);
  };

  const resetHistory = () => {
    localStorage.save({
      key: "history",
      data: JSON.stringify([]),
    });
    setHistory([]);
  };

  return {
    isPending,
    history,
    question,
    setQuestion,
    resetHistory,
    askQuestion,
  };
};
