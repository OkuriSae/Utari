# 環境構築
1. [Docker Desktop](https://www.docker.com/products/docker-desktop) をインストールして起動。
2. `cd docker`
3. `docker-compose up -d` :コンテナを立ち上げ
4. `docker-compose exec app bash` :立ち上げたコンテナのコンソールに入る
5. `ls` で Utari の開発ディレクトリがマウントされていることを確認。（ `firebase.json` とかがあるはず）
6. `firebase login --no-localhost` :firebase CLI にログイン
7. ローカル環境を立ち上げたい時: `firebase emulators:start` （http://0.0.0.0:5000/ などで接続）
8. デプロイしたい時: `firebase deploy`
9. コンテナからログアウトしたい時: `exit`
10. コンテナをシャットダウン: `docker-compose down`
