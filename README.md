### [ K O S M O S | B U R E A U ]

## setup
npm i

brew tap mongodb/brew
brew install mongodb-community@5.0

brew services start mongodb/brew/mongodb-community
mongorestore --gzip dump

## start
node apps/kosmos/app.js
gulp build
