rm -rf working_docker_dir
git clone https://github.com/shaya2468/AgainDocker.git
mkdir working_docker_dir
cp -r AgainDocker/6-dockerizing/ working_docker_dir
rm -rf AgainDocker
cd working_docker_dir
find . | grep "\.git/" | xargs rm -rf
git init
git add .
git commit -m "first commit"
git_command="git remote add origin https://github.com/shaya2468/${1}.git"
eval $git_command
git push -u origin master