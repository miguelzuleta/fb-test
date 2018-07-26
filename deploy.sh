echo "Enter merge deploy commit message"
read commitMessage

function deleteInit() {
	if [ -e init.sh ]
	then
		rm -rf init.sh
	fi
}
deleteInit

function commitToBranch() {
	git add .
	git commit -m "$commitMessage"
	git push
}

gulp --prod --deploy
commitToBranch
git checkout master

deleteInit

git checkout dev site
mv site/* .
rm -rf site
commitToBranch

git checkout dev
