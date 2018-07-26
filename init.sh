tempfolder="temp-init"

if git rev-parse --verify --quiet dev; then
	git branch -D dev
fi

echo "what's the epo name?"
read projectName

git checkout --track origin/dev

# create temp-init folder
# to copy dev contents
mkdir ../$tempfolder
cp -r . ../$tempfolder

# handle master branch
git checkout master
rm -rf .git

git init
git add .
git commit -m "init master branch"

git remote add origin https://github.com/miguelzuleta/$projectName.git
git push -u origin master

# handle dev branch
git checkout -b dev

# add contents from temp-init folder
# into current dev branch
rm -rf ../$tempfolder/.git
mv ../$tempfolder/{.,}* ./
rm -rf ../$tempfolder

git add .
git commit -m "init dev branch"
git push --set-upstream origin dev

nvm use 8
npm install
