import { useState } from "react";
// importするところ

function App() {
  const [cards, setCards] = useState([
    { id: crypto.randomUUID(), text: "仕事", memos: [] },
    { id: crypto.randomUUID(), text: "プライベート", memos: [] },
    { id: crypto.randomUUID(), text: "買い物", memos: [] },
  ]);
  const [inputValue, setInputValue] = useState("");
  // 変数・関数を書くところ
  // 「仕事」「プライベート」「買い物」の項目を作成
  const [memoValue, setMemoValue] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("null");

  const handleAddCard = () => {
    const newCard = { id: crypto.randomUUID(), text: inputValue, memos: [] };
    const newCards = [...cards, newCard];
    setCards(newCards); //新しい入力を可能にする
    setInputValue(""); // 入力欄をクリア
  };
  //追加ボタンを押したときの処理

  const handleDeleteCard = (idToDelete) => {
    const newCards = cards.filter((card) => card.id !== idToDelete);
    setCards(newCards);
  };
  //削除ボタンを押したときの処理

  const handleAddMemo = () => {
    const updatedCard = {
      id: crypto.randomUUID(),
      text: inputValue,
      memos: [],
    };

    const updatedCards = [...cards, updatedCard];
    setCards(updatedCards); //新しい入力を可能にする
    setMemoValue(""); // 入力欄をクリア
  };

  return (
    <div>
      <h1>タスク追加画面</h1>
      <input
        type="text"
        placeholder="タスク名を入力"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddCard}>追加</button>
      <input
        type="text"
        placeholder="メモを入力"
        value={memoValue}
        onChange={(e) => setMemoValue(e.target.value)}
      />
      <button onClick={handleAddMemo}>カテゴリ追加</button>

      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="todo">{card.text}</div>
          <button className="delete" onClick={() => handleDeleteCard(card.id)}>
            削除
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
