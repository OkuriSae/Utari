# 環境構築
1. [Docker Desktop](https://www.docker.com/products/docker-desktop) をインストールして起動。
2. `cd docker`
3. `docker-compose up -d` :コンテナを立ち上げ
4. `docker-compose exec app bash` :立ち上げたコンテナのコンソールに入る
5. `ls` で Utari の開発ディレクトリがマウントされていることを確認。（ `firebase.json` とかがあるはず）
6. `cd functions`
7. `yarn install`
8. `npm run build`
9. `firebase login --no-localhost` :firebase CLI にログイン
10. ローカル環境を立ち上げたい時: `firebase emulators:start` （http://0.0.0.0:5000/ などで接続）
11. デプロイしたい時: `firebase deploy`
12. コンテナからログアウトしたい時: `exit`
13. コンテナをシャットダウン: `docker-compose down`
