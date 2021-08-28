# 環境構築
1. [Docker Desktop](https://www.docker.com/products/docker-desktop) をインストールして起動。
2. `cd docker`
3. `docker-compose up -d` :コンテナを立ち上げ
4. `docker-compose exec app bash` :立ち上げたコンテナのコンソールに入る
5. `ls` で Utari の開発ディレクトリがマウントされていることを確認。（ `firebase.json` とかがあるはず）
6. `npm install`
7. `npm run build`
8. `firebase login --no-localhost` :firebase CLI にログイン
9. ローカル環境を立ち上げたい時: `firebase emulators:start` または `npm run start` （http://0.0.0.0:5000/ などで接続）
  - ローカル環境のソースファイルの変更を反映しつつ立ち上げたい時: `npm run start:watch`
10. デプロイしたい時: `firebase deploy`
11. コンテナからログアウトしたい時: `exit`
12. コンテナをシャットダウン: `docker-compose down`
