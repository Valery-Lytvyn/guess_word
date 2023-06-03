import React from "react";
import { getRndInteger, reloadingPage } from "../services";
import wordList from "../store/wordList.json";
import alphabet from "../store/alphabet.json";

export const useLocalStorage = (currentLanguage: "eng" | "укр") => {
  React.useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);
};

export const useWord = (lng: string) => {
  const [wordToGuesses, setWordToGuesses] = React.useState("");

  React.useEffect(() => {
    const dictionary = lng === "eng" ? [...wordList.eng] : [...wordList.ua];
    const rndInt = getRndInteger(dictionary.length);
    setWordToGuesses(dictionary[rndInt]);
  }, [lng]);
  return wordToGuesses;
};

export const useKeyboard = (language: string) => {
  const [keys, setKeys] = React.useState<string[] | null>([]);

  React.useEffect(() => {
    const newKeys = language === "eng" ? alphabet.en : alphabet.ua;
    setKeys(newKeys);
  }, [language]);

  return keys;
};

export const useRefreshGame = (isGameOver: boolean) => {
  React.useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => reloadingPage(), 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isGameOver]);
};
