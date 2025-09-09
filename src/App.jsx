import { useState } from "react";
import "./App.css";
import Category from "./Category";
import RecordPanel from "./RecordPanel";

function App() {
  const [categories, setCategories] = useState([
    {
      id: crypto.randomUUID(),
      name: "家事",
      items: [
        { id: crypto.randomUUID(), name: "買い物" },
        { id: crypto.randomUUID(), name: "洗濯" },
        { id: crypto.randomUUID(), name: "掃除" },
        { id: crypto.randomUUID(), name: "申請" },
      ],
    },
    { id: crypto.randomUUID(), name: "仕事", items: [] },
    { id: crypto.randomUUID(), name: "勉強", items: [] },
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");

  // カテゴリごとの記録を保存するための状態を定義
  const [records, setRecords] = useState({});

  // 選択されたカテゴリのIDを使って、categoriesの中から該当するカテゴリのデータを見つける
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  // 新しいカテゴリを追加する関数
  const handleAddCategory = () => {
    // 入力フォームが空なら何もしない
    if (!newCategoryName.trim()) return;

    // 新しいカテゴリのデータを作成
    const newCategory = {
      id: crypto.randomUUID(),
      name: newCategoryName,
      items: [],
    };
    // categoriesの状態を更新する（現在の配列に新しいカテゴリを追加）
    setCategories([...categories, newCategory]);
    // 入力フォームを空に戻す
    setNewCategoryName("");
  };

  // カテゴリを削除する関数
  const handleDeleteCategory = (categoryId) => {
    // 削除したいカテゴリ以外を新しい配列として取得
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);

    // もし削除したカテゴリが選択中だったら、選択を解除する
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    }

    // 記録も削除する
    const updatedRecords = { ...records };
    delete updatedRecords[categoryId];
    setRecords(updatedRecords);
  };

  // 項目（タスク）を追加する関数
  const handleAddItem = (categoryId, itemName) => {
    // 全カテゴリの配列をループして、該当するカテゴリの項目に新しい項目を追加する
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const newItem = { id: crypto.randomUUID(), name: itemName };
        return { ...category, items: [...category.items, newItem] };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  // 項目（タスク）を削除する関数
  const handleDeleteItem = (categoryId, itemId) => {
    // 全カテゴリの配列をループして、該当するカテゴリから項目を削除する
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const filteredItems = category.items.filter(
          (item) => item.id !== itemId
        );
        return { ...category, items: filteredItems };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  // 記録を追加する関数
  const handleAddRecord = (categoryId, record) => {
    // recordsの状態を更新する（該当するカテゴリに新しい記録を追加）
    const currentRecords = records[categoryId] || [];
    setRecords({
      ...records,
      [categoryId]: [...currentRecords, record],
    });
  };

  // 記録を削除する関数
  const handleDeleteRecord = (categoryId, recordId) => {
    // recordsの状態を更新する（該当するカテゴリから記録を削除）
    const currentRecords = records[categoryId] || [];
    const updatedRecordsForCategory = currentRecords.filter(
      (record) => record.id !== recordId
    );
    setRecords({
      ...records,
      [categoryId]: updatedRecordsForCategory,
    });
  };

  // 画面に表示する内容（JSX）を返す
  return (
    <div className="app-container">
      {/* メニューパネル */}
      <div className="menu-panel">
        <button>Hello!</button>
        <button>To Do</button>
        <button className="selected">Records</button>
        <button>Tips</button>
        <button>Share</button>
      </div>

      {/* カテゴリリスト */}
      <div className="left-panel">
        <h2>カテゴリ一覧</h2>
        <div className="categories-container">
          {/* categoriesの状態をループして、各カテゴリごとにCategoryコンポーネントを表示 */}
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              isSelected={selectedCategoryId === category.id}
              onSelect={setSelectedCategoryId}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onDeleteCategory={handleDeleteCategory}
            />
          ))}
        </div>
        {/* 新しいカテゴリを追加するための入力フォーム */}
        <div className="add-category-form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="新しいジャンルを追加"
          />
          <button onClick={handleAddCategory}>追加</button>
        </div>
      </div>

      {/* 記録パネル */}
      <div className="right-panel">
        {/* RecordPanelコンポーネントを表示 */}
        <RecordPanel
          category={selectedCategory}
          records={records}
          onAddRecord={handleAddRecord}
          onDeleteRecord={handleDeleteRecord}
        />
      </div>
    </div>
  );
}

export default App; // Appコンポーネントを他のファイルで使えるようにする
