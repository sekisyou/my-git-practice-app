import { useState } from "react";

const Category = ({
  category,
  isSelected,
  onSelect,
  onAddItem,
  onDeleteItem,
  onDeleteCategory,
}) => {
  const [newItemName, setNewItemName] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // カテゴリ名のクリックで記録パネルを表示する
  const handleCategoryClick = () => {
    onSelect(category.id);
  };

  // 展開/折りたたみアイコンのクリック
  const handleToggleClick = (event) => {
    // 親要素へのイベント伝播を防ぐ
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // カテゴリの削除ボタンのクリック
  const handleDeleteCategoryClick = (event) => {
    event.stopPropagation();
    onDeleteCategory(category.id);
  };

  // 新しいタスクを追加するボタンのクリック
  const handleAddItemClick = () => {
    if (newItemName.trim() === "") {
      // 入力が空の場合は何もしない
      return;
    }
    // 親コンポーネントの関数を呼び出してタスクを追加
    onAddItem(category.id, newItemName);
    // 入力フォームを空にする
    setNewItemName("");
  };

  return (
    <div className={`category-container ${isSelected ? "selected" : ""}`}>
      {/* カテゴリ名と削除ボタン */}
      <div className="category-header" onClick={handleCategoryClick}>
        <div className="category-title">
          <span className="toggle-icon" onClick={handleToggleClick}>
            {isExpanded ? "▼" : "▶"}
          </span>
          {category.name}
        </div>
        <button
          className="delete-category-btn"
          onClick={handleDeleteCategoryClick}
        >
          -
        </button>
      </div>

      {/* タスク一覧 (展開/折りたたみ機能) */}
      {isExpanded && (
        <div className="items-container">
          {category.items.map((item) => (
            <div className="item" key={item.id}>
              <div className="item-name" onClick={handleCategoryClick}>
                {item.name}
              </div>
              <button
                className="delete-item-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(category.id, item.id);
                }}
              >
                -
              </button>
            </div>
          ))}

          {/* 新しいタスクを追加するための入力フォーム */}
          <div className="add-item-form">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="新しい項目を追加"
            />
            <button onClick={handleAddItemClick}>追加</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
