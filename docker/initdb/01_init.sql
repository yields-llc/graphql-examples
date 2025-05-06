-- ユーザー情報を格納するテーブル
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,          -- ユーザーID
                       username VARCHAR(150) NOT NULL UNIQUE, -- ユーザー名 (一意)
                       email VARCHAR(255) NOT NULL UNIQUE,    -- メールアドレス (一意)
                       password_hash TEXT NOT NULL,           -- パスワードハッシュ
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新日時
);

-- プロジェクトやタスク管理システム向けのプロジェクトデータ
CREATE TABLE projects (
                          id BIGSERIAL PRIMARY KEY,          -- プロジェクトID
                          name VARCHAR(255) NOT NULL,        -- プロジェクト名
                          description TEXT,                  -- プロジェクトの説明
                          owner_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE, -- プロジェクトの所有者
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新日時
);

-- タスク管理のタスクデータ
CREATE TABLE tasks (
                       id BIGSERIAL PRIMARY KEY,          -- タスクID
                       title VARCHAR(255) NOT NULL,       -- タスクのタイトル
                       description TEXT,                  -- タスクの説明
                       status VARCHAR(50) DEFAULT 'pending', -- ステータス ('pending', 'in_progress', 'completed' など)
                       project_id BIGINT NOT NULL REFERENCES projects (id) ON DELETE CASCADE, -- 紐づくプロジェクト
                       assignee_id BIGINT REFERENCES users (id) ON DELETE SET NULL, -- 担当ユーザー (NULL 可)
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新日時
);

-- コメントデータ。タスク、プロジェクトに紐づく
CREATE TABLE comments (
                          id BIGSERIAL PRIMARY KEY,          -- コメントID
                          content TEXT NOT NULL,             -- コメント内容
                          user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE, -- コメントしたユーザー
                          task_id BIGINT REFERENCES tasks (id) ON DELETE CASCADE, -- 対象タスク
                          project_id BIGINT REFERENCES projects (id) ON DELETE CASCADE, -- 対象プロジェクト
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 作成日時
);

-- タグ機能を持たせるためのタグマスタ
CREATE TABLE tags (
                      id BIGSERIAL PRIMARY KEY,          -- タグID
                      name VARCHAR(50) NOT NULL UNIQUE   -- タグ名 (一意)
);

-- タグとタスクを紐付ける中間テーブル
CREATE TABLE task_tags (
                           id BIGSERIAL PRIMARY KEY,          -- 中間テーブルID
                           task_id BIGINT NOT NULL REFERENCES tasks (id) ON DELETE CASCADE, -- 紐づくタスク
                           tag_id BIGINT NOT NULL REFERENCES tags (id) ON DELETE CASCADE    -- 紐づくタグ
);

-- ログやアクティビティ追跡データ
CREATE TABLE activity_logs (
                               id BIGSERIAL PRIMARY KEY,          -- ログID
                               user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE, -- ユーザーID
                               action VARCHAR(255) NOT NULL,      -- 行動の種類 (例: 'created_task', 'updated_project')
                               details JSONB,                     -- 詳細情報 (JSON や Key-Value データ形式)
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 作成日時
);
