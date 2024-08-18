import { Metadata } from "next";
import { ShuffleMemberForm } from "./form";

export const metadata: Metadata = {
  title: "入力フォーム",
  description: "Playwrightハンズオンの第2のステップ",
};

const Form = () => {
  return (
    <main>
      <h1>入力フォーム</h1>
      <ShuffleMemberForm />
    </main>
  );
};

export default Form;
