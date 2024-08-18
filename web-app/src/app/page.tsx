import { Metadata } from "next";

export const metadata: Metadata = {
  title: "最初のページ",
  description: "Playwrightハンズオンの最初のステップ",
};

const Home = () => {
  return (
    <main>
      <h1>Playwrightのハンズオン</h1>
      <p>あなたは1週間後にはE2Eテストのエキスパートです。</p>
      <p>
        <button>操作ボタン</button>
      </p>
    </main>
  );
};

export default Home;
