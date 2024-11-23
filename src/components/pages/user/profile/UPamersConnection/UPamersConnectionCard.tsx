"use client";

import { useEffect, useState } from "react";
import { BiSolidMessageDetail } from "react-icons/bi";

const uPammersService = {
  getUserData: async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    });

    return await response.json();
  },
};

const usePageState = (url?: string) => {
  const [state, setState] = useState<{
    loading: boolean;
    isData: boolean;
    data: Partial<{
      userName: string;
      unreadChatsCount: number;
    }>;
  }>({
    loading: true,
    isData: false,
    data: {},
  });

  useEffect(() => {
    if (!url) {
      setState((prev) => ({ ...prev, loading: false, isData: false }));

      return;
    }

    uPammersService
      .getUserData(url)
      .then(({ data }) => {
        setState((prev) => ({ ...prev, data, isData: true }));
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return state;
};

const UPamersConnectionCard = ({ url }: { url?: string }) => {
  const { loading, isData, data } = usePageState(url);

  const content = isData ? (
    <>
      <p className="text-base text-black">U-pamers - {data?.userName}</p>
      <div className="flex gap-2 items-center">
        <BiSolidMessageDetail className="text-lg" />{" "}
        <span className="text-sm">({data?.unreadChatsCount})</span>
      </div>
    </>
  ) : (
    "Дані не знайдено"
  );

  return (
    <div className="flex items-center gap-5 bg-purple-300 p-2 rounded-md">
      {loading ? <p>Завантаження...</p> : content}
    </div>
  );
};

export default UPamersConnectionCard;
