"use client";

import { useCallback, useRef, useState } from "react";

export const ShuffleMemberForm = () => {
  // 結果
  const [result, setResult] = useState<string[]>([]);
  // 要素への参照
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  // 通信
  const callApi = useCallback(async () => {
    const members = [];
    const refs = [firstRef, secondRef, thirdRef];
    for (const ref of refs) {
      if (ref.current?.value) {
        members.push(ref.current?.value);
      }
    }
    const res = await fetch("/api/shuffle", {
      method: "post",
      body: JSON.stringify({ members }),
    });
    if (res.ok) {
      const result = (await res.json()) as { members: string[] };
      setResult(result.members);
    }
  }, []);

  return (
    <>
      <label htmlFor="first">1人目:</label>
      <input
        type="text"
        ref={firstRef}
        id="first"
        name="first"
        placeholder="1人目の名前を入力"
      />
      <br />
      <label htmlFor="second">2人目:</label>
      <input
        type="text"
        ref={secondRef}
        id="second"
        name="second"
        placeholder="2人目の名前を入力"
      />
      <br />
      <label htmlFor="third">3人目:</label>
      <input
        type="text"
        ref={thirdRef}
        id="third"
        name="third"
        placeholder="3人目の名前を入力"
      />
      <br />

      <button onClick={callApi}>シャッフル</button>
      <br />
      <label htmlFor="result">結果</label>
      <br />
      <output id="result" htmlFor="first second third fourth">
        {result.join("→")}
      </output>
    </>
  );
};
