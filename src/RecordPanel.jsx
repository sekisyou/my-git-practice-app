import { useState } from "react";

const RecordPanel = ({ category, records, onAddRecord, onDeleteRecord }) => {
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    description: "",
    duration: "",
  });

  const handleAddRecord = () => {
    // 内容が空の場合は何もしない
    if (newRecord.description.trim() === "") {
      return;
    }

    // 新しい記録のオブジェクトを作成
    const recordToAdd = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      date: newRecord.date,
      time: newRecord.time,
      description: newRecord.description,
      duration: newRecord.duration,
    };

    // 親コンポーネントの関数を呼び出して記録を追加
    onAddRecord(category.id, recordToAdd);

    // フォームの入力内容をリセットする
    setNewRecord({
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      description: "",
      duration: "",
    });
  };

  if (!category) {
    return (
      <div className="record-panel">
        <div className="no-selection">
          <h3>カテゴリを選択してください</h3>
          <p>
            左側のカテゴリをクリックすると、そのカテゴリの記録が表示されます。
          </p>
        </div>
      </div>
    );
  }

  // カテゴリの記録一覧を取得。記録がない場合は空の配列を使う
  const categoryRecords = records[category.id] || [];

  return (
    <div className="record-panel">
      <div className="record-header">
        <h3>{category.name}の記録</h3>
      </div>

      {/* 記録追加フォーム */}
      <div className="add-record-form">
        <h4>新しい記録を追加</h4>
        <div className="form-row">
          <input
            type="date"
            value={newRecord.date}
            onChange={(e) =>
              setNewRecord({ ...newRecord, date: e.target.value })
            }
          />
          <input
            type="time"
            value={newRecord.time}
            onChange={(e) =>
              setNewRecord({ ...newRecord, time: e.target.value })
            }
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="内容"
            value={newRecord.description}
            onChange={(e) =>
              setNewRecord({ ...newRecord, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="所要時間"
            value={newRecord.duration}
            onChange={(e) =>
              setNewRecord({ ...newRecord, duration: e.target.value })
            }
          />
        </div>
        <button onClick={handleAddRecord} className="add-record-btn">
          記録追加
        </button>
      </div>

      {/* 記録一覧 */}
      <div className="records-list">
        <h4>記録一覧</h4>
        {categoryRecords.length === 0 ? (
          <div className="no-records">まだ記録がありません</div>
        ) : (
          categoryRecords.map((record) => (
            <div key={record.id} className="record-item">
              <div className="record-date-time">
                {record.date} {record.time}
              </div>
              <div className="record-description">{record.description}</div>
              {record.duration && (
                <div className="record-duration">
                  所要時間: {record.duration}
                </div>
              )}
              <button
                className="delete-record-btn"
                onClick={() => onDeleteRecord(category.id, record.id)}
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecordPanel;
