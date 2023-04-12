---
title: "Git 笔记"
description: "Git 笔记"
---

### Git 基本概念

工作区

暂存区

本地仓库

远程仓库

### Git 配置

#### 设置用户名

```powershell
git config --global user.name [Deshun]
```

#### 设置邮箱

```powershell
git config --global user.email [deshun@w3h5.com]
```

#### 查看配置文件：Git Bash Here

```powershell
cat .gitconfig // 需要在用户目录执行
```

#### 初始化本地库

```powershell
git init
```

#### 查看本地库状态

```
git status
```

### Git 基础命令



#### 撤销 add 暂存 

使用 ` git restore --staged` 命令，指定想要撤销的文件名。例如：

```
git restore --staged myfile.txt
```

使用 `git reset` 命令，指定想要撤销的文件名。例如：

```
git reset myfile.txt
```

如果要撤销所有已经添加的文件：

`git reset` 命令可以不指定文件名，执行后会列出所以被撤销暂存的文件。

`git restore --staged` 使用 `*` 或者 `.` 代表全部。如下：

```
git reset
git restore --staged *
```

这些命令只会从暂存区移除文件，不会影响文件的内容。

### git remote

为了便于管理，Git 要求每个远程主机都必须指定一个主机名。`git remote` 命令就用于管理主机名。

不带选项的时候，`git remote` 命令列出所有远程主机。

```powershell
git remote
# origin
```

使用 `-v` 选项，可以参看远程主机的网址。

```powershell
git remote -v
# origin  git@github.com:jquery/jquery.git (fetch)
# origin  git@github.com:jquery/jquery.git (push)
```

上面命令表示，当前只有一台远程主机，叫做 `origin`，以及它的网址。

克隆版本库的时候，所使用的远程主机自动被 Git 命名为 `origin` 。如果想用其他的主机名，需要用 `git clone` 命令的 `-o` 选项指定。

```powershell
git clone -o jQuery https://github.com/jquery/jquery.git
git remote
# jQuery
```

上面命令表示，克隆的时候，指定远程主机叫做 jQuery。

`git remote show` 命令加上主机名，可以查看该主机的详细信息。

```powershell
git remote show <主机名>
```

#### 添加远程主机 add

`git remote add` 命令用于添加远程主机。

```powershell
git remote add <主机名> <网址>
```

#### 删除远程主机 rm

`git remote rm` 命令用于删除远程主机。

```powershell
git remote rm <主机名>
```

#### 远程主机改名 rename 

`git remote rename` 命令用于远程主机的改名。

```powershell
git remote rename <原主机名> <新主机名>
```



### git fetch

#### 将更新取回本地 

一旦远程主机的版本库有了更新（Git术语叫做 commit ），需要将这些更新取回本地，这时就要用到 `git fetch` 命令。

```powershell
git fetch <远程主机名>
```

上面命令将某个远程主机的更新，全部取回本地。

`git fetch` 命令通常用来查看其他人的进程，因为它取回的代码对你本地的开发代码没有影响。

#### 取回指定分支

默认情况下，`git fetch` 取回所有分支（branch）的更新。如果只想取回特定分支的更新，可以指定分支名。

```powershell
git fetch <远程主机名> <分支名>
```

比如，取回 `origin` 主机的 `master` 分支。

```powershell
git fetch origin master
```

所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。比如 `origin` 主机的 `master`，就要用 `origin/master` 读取。

`git branch` 命令的 `-r` 选项，可以用来查看远程分支，`-a` 选项查看所有分支。

```powershell
git branch -r
# origin/master

git branch -a
# * master
#   remotes/origin/master
```

上面命令表示，本地主机的当前分支是 `master` ，远程分支是 `origin/master`。

取回远程主机的更新以后，可以在它的基础上，使用 `git checkout` 命令创建一个新的分支。

```powershell
git checkout -b newBrach origin/master
```

上面命令表示，在 `origin/master` 的基础上，创建一个新分支。

此外，也可以使用 `git merge` 命令或者 `git rebase` 命令，在本地分支上合并远程分支。

```powershell
git merge origin/master
# 或者
git rebase origin/master
```

上面命令表示在当前分支上，合并 `origin/master`。



### git pull

`git pull` 命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。它的完整格式稍稍有点复杂。

```powershell
git pull <远程主机名> <远程分支名>:<本地分支名>
```

#### 取回远程分支并与本地分支合并

比如，取回 `origin` 主机的 `next` 分支，与本地的 `master` 分支合并，需要写成下面这样。

```powershell
git pull origin next:master
```

如果远程分支是与当前分支合并，则冒号后面的部分可以省略。

```powershell
git pull origin next
```

上面命令表示，取回 `origin/next` 分支，再与当前分支合并。实质上，这等同于先做 `git fetch` ，再做 `git merge` 。

```powershell
git fetch origin
git merge origin/next
```

#### 建立追踪关系

在某些场合，Git会自动在本地分支与远程分支之间，建立一种追踪关系（tracking）。比如，在 `git clone` 的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的 `master` 分支自动“追踪” `origin/master` 分支。

Git 也允许手动建立追踪关系。

```powershell
git branch --set-upstream master origin/next
```

上面命令指定 `master` 分支追踪 `origin/next` 分支。

上面的命令可能过时了，如果报错 `fatal: the '--set-upstream' option is no longer supported. Please use '--track' or '--set-upstream-to' instead.` 可以使用**新的命令**：

```powershell
git branch master --set-upstream-to=origin/master
```

如果是关联当前分支，可以忽略本地分支名称：

```powershell
git branch --set-upstream-to=origin/master
```

如果当前分支与远程分支存在追踪关系，`git pull` 就可以省略远程分支名。

```powershell
git pull origin
```

上面命令表示，本地的当前分支自动与对应的 `origin` 主机“追踪分支”（remote-tracking branch）进行合并。

如果当前分支只有一个追踪分支，连远程主机名都可以省略。

```powershell
git pull
```

上面命令表示，当前分支自动与唯一一个追踪分支进行合并。

如果合并需要采用 rebase 模式，可以使用 `--rebase` 选项。

```powershell
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```

如果远程主机删除了某个分支，默认情况下，`git pull` 不会在拉取远程分支的时候，删除对应的本地分支。这是为了防止，由于其他人操作了远程主机，导致`git pull` 不知不觉删除了本地分支。

但是，你可以改变这个行为，加上参数 `-p` 就会在本地删除远程已经删除的分支。

```powershell
git pull -p
# 等同于下面的命令
git fetch --prune origin 
git fetch -p
```

#### 取消追踪远程分支

##### 取消本地分支与上游分支的关联

使用 `git branch --unset-upstream <branchname>` 命令可以取消本地分支与上游分支的关联。

##### 删除本地的远程跟踪分支

使用 `git branch -d -r origin/<remote branch name>` 命令可以删除本地的远程跟踪分支，即删除本地设置为跟踪远程分支的分支。这个命令不会删除远程仓库中的分支。

##### 移除本地分支的配置信息

使用 `git config --unset branch <branch> remote` 和 `git config --unset branch <branch> merge` 命令，这两个命令可以移除本地分支的配置信息，使其不再与远程分支相关联。



### git push

`git push` 命令用于将本地分支的更新，推送到远程主机。它的格式与 `git pull` 命令相仿。

```powershell
git push <远程主机名> <本地分支名>:<远程分支名>
```

注意，分支推送顺序的写法是 `<来源地>:<目的地>`，所以`git pull`是 `<远程分支>:<本地分支>`，而 `git push` 是 `<本地分支>:<远程分支>`。

如果省略远程分支名，则表示将本地分支推送与之存在“追踪关系”的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。

```powershell
git push origin master
```

上面命令表示，将本地的 `master` 分支推送到 `origin` 主机的 `master` 分支。如果后者不存在，则会被新建。

如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。

```powershell
git push origin HEAD:master
# or 
git push origin :master
# 等同于
git push origin --delete master
```

上面命令表示删除 `origin` 主机的 `master` 分支。

如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。

```powershell
git push origin
```

上面命令表示，将当前分支推送到 `origin` 主机的对应分支。

如果当前分支只有一个追踪分支，那么主机名都可以省略。

```powershell
git push
```

如果当前分支与多个主机存在追踪关系，则可以使用 `-u` 选项指定一个默认主机，这样后面就可以不加任何参数使用 `git push`。

```powershell
git push -u origin master
```

上面命令将本地的 `master` 分支推送到 `origin` 主机，同时指定 `origin` 为默认主机，后面就可以不加任何参数使用 `git push` 了。

不带任何参数的 `git push`，默认只推送当前分支，这叫做 simple 方式。此外，还有一种 matching 方式，会推送所有有对应的远程分支的本地分支。Git 2.0 版本之前，默认采用 matching 方法，现在改为默认采用 simple 方式。如果要修改这个设置，可以采用 `git config` 命令。

```powershell
git config --global push.default matching
# 或者
git config --global push.default simple
```

还有一种情况，就是不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机，这时需要使用 `--all` 选项。

```powershell
git push --all origin
```

上面命令表示，将所有本地分支都推送到 `origin` 主机。

如果远程主机的版本比本地版本更新，推送时Git会报错，要求先在本地做 `git pull` 合并差异，然后再推送到远程主机。这时，如果你一定要推送，可以使用 `--force` 选项。

```powershell
git push --force origin 
```

上面命令使用 `--force` 选项，结果导致远程主机上更新的版本被覆盖。除非你很确定要这样做，否则应该尽量避免使用 `--force` 选项。

最后，`git push` 不会推送标签（tag），除非使用 `--tags` 选项。

```powershell
git push origin --tags
```

#### 合并冲突撤销

`git merge --abort` 安全的撤销合并操作。

当解决完冲突，并且在合并完成后发现一个错误，还是有机会简单地撤销它。

`git reset --hard` 可以回滚到那个合并开始前的状态。

#### 撤销提交

提交代码以后，突然意识到这个提交有问题，应该撤销掉，这时执行下面的命令就可以了。

```powershell
git revert HEAD
```

`git revert` 命令只能抵消上一个提交，如果想抵消多个提交，必须在命令行依次指定这些提交。比如，抵消前两个提交，要像下面这样写。

```powershell
git revert [倒数第一个提交] [倒数第二个提交]
```

`git revert` 命令还有两个参数。

- `--no-edit`：执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。
- `--no-commit`：只抵消暂存区和工作区的文件变化，不产生新的提交。

#### 替换上一次提交

提交以后，发现提交信息写错了，这时可以使用 `git commit` 命令的 `--amend` 参数，可以修改上一次的提交信息。

```powershell
git commit --amend -m "Fixes bug #42"
```



#### 撤销工作区的文件修改

如果工作区的某个文件被改乱了，但还没有提交，可以用 `git checkout` 命令找回本次修改之前的文件。

```powershell
git checkout -- [filename]
```

支持通配符，比如撤销全部修改。

```powershell
git checkout -- *
```

它的原理是先找暂存区，如果该文件有暂存的版本，则恢复该版本，否则恢复上一次提交的版本。

注意，工作区的文件变化一旦被撤销，就无法找回了。

#### 从暂存区撤销文件

如果不小心把一个文件添加到暂存区，可以用下面的命令撤销。

```powershell
git rm --cached [filename]
```

#### 撤销当前分支的变化

你在当前分支上做了几次提交，突然发现放错了分支，这几个提交本应该放到另一个分支。

```powershell
# 新建一个 feature 分支，指向当前最新的提交
# 注意，这时依然停留在当前分支
git branch feature

# 切换到这几次提交之前的状态
git reset --hard [当前分支此前的最后一次提交]

# 切换到 feature 分支
git checkout feature
```



### git reset





### git clean

`git clean` 用于从工作树中删除**未跟踪（tracked）**的文件，即没有被 `git add` 过的文件。

`git clean` 经常和 `git reset --hard` 一起结合使用， `reset` 只影响被 track 过的文件。结合使用这两个命令能让你的工作目录完全回到一个指定的 `commit` 的状态。

#### 查看将要删除的内容

`git clean -n` 显示将要删除的文件和目录，不会真正删除文件，只是一个提醒。

#### 删除文件

`git clean -f` 删除当前目录下的**文件**。不会删除 `.gitignore` 文件里面指定的文件夹和文件。

#### 删除指定目录下的文件

`git clean -f <path>` 删除**指定路径下的文件**。

#### 删除文件和文件夹

`git clean -df` 删除当前目录下的**文件和文件夹**。

#### 删除所有文件

`git clean -xf` 删除当前目录下所有文件，包括 `.gitignore` 文件中指定忽略的文件夹和文件。



### git branch

#### 修改本地分支名

可以使用 `git branch -m new-name` 命令来修改当前分支名，或者使用 `git branch -m old-name new-name` 命令来修改另一个分支的名称。

#### 修改远程分支名

可以先删除远程分支，然后推送修改后的本地分支。

例如，使用 `git push origin --delete old-name` 命令来删除远程分支，然后使用 `git push origin -u new-name` 命令来推送新的分支。

#### 更新本地克隆

如果修改了远程分支名，需要在本地克隆中更新分支的信息。你可以使用上面 `git pull` 的一系列命令来完成这个操作。




### 删除远程分支文件

#### 仅仅删除远程分支文件，不删除本地文件

##### 删除远程 文件 filename

```powershell
git rm --cached filename
git commit -m "delete remote file filename"
git push -u origin <branchName>
```

##### 删除远程文件夹 directoryName

```powershell
git rm -r --cached directoryname
git commit -m "delete remote directory directoryName"
git push -u origin <branchName>
```

#### 删除本地文件与远程分支文件

##### 删除文件 filename

```powershell
git rm filename
git commit -m "delete file filename"
git push -u origin <branchName>
```

##### 删除文件夹 directoryName

```powershell
git rm -r directoryname
git commit -m "delete directory directoryName"
git push -u origin <branchName>
```



### 常见问题

#### refusing to merge unrelated histories 问题解决

##### 一、合并分支时允许合并不相关的历史

在合并分支提示 `refusing to merge unrelated histories`，是由于两个分支拥有不相关的提交历史，所以合并被拒绝。

如果确实需要合并，则可以在执行 `merge` 命令时指定一个 `--allow-unrelated-histories` 参数，会允许合并不相关的历史。

例如，合并 `feature` 分支到 `master` 分支：

```powershell
git merge feature --allow-unrelated-histories
```

即可成功合并，确认没有问题之后提交分支。

##### 二、使用 git reset --hard 命令将 feature 分支覆盖到 master 分支

使用方法一会保留之前 master 分支上提交的记录，而且 feature 分支的记录会变成一条总的记录到 master 分支上，这个不是我们想要的效果，我们比较希望丢弃 master 原来的提交记录，而将 feature 的所有记录都覆盖到 master 上。

特别注意
特别注意
特别注意

本操作是将 feature 分支的提交记录覆盖到 master 分支上，所以 master 分支上之前的提交记录将全部丢失，我不清楚是否可以恢复，所以请谨慎操作，确定被覆盖的分支不需要之后再进行操作！！

操作步骤：

1. 先切换到 mster 分支

   ```powershell
   git checkout master
   ```

2. 使用 reset 命令重设 hard

   ```powershell
   git reset --hard  origin/feature
   ```

3. 执行完以上的命令，master 分支就被远程的 feature 分支所覆盖，如果没有问题就可以提交了，提交时需要使用命令强制推送

   ```powershell
   git push -f
   ```

#### LF和CRLF换行符不一致问题

Windows 系统使用 CRLF（回车换行）作为换行符，而 Linux 和 MacOS 系统使用 LF（换行）作为换行符。这种差异会导致 `git diff` 中显示整个文件都被修改了，或者合并分支时出现冲突等。

Git 有一个全局配置项叫做 `core.autocrlf`，可以控制 Git 在提交和检出时是否对换行符进行转换。有三个可选值：

- `true`：表示在提交时将 CRLF 转换为 LF，在检出时将 LF 转换为 CRLF 。这个选项适合 Windows 用户使用。
- `input`：表示在提交时将 CRLF 转换为 LF，在检出时不进行转换。这个选项适合 Linux 和 MacOS 用户使用。
- `false`：表示不进行任何转换。这个选项适合想保持原始换行符不变的用户使用。

*为了保持代码统一，我还是习惯使用 `LF` 作为 `core.autocrlf` 的默认配置。*

可以使用 `git config` 命令来查看或修改 `core.autocrlf` 属性，例如：

```
git config --global core.autocrlf [input | true | false]
```

也可以像上面一样，在 `.gitconfig` 文件中直接编辑 `core.autocrlf` 属性，例如：

```
[core]
	autocrlf = input
```

除了 `core.autocrlf` 之外，还有一个配置项叫做 `core.eol`（end of line），它可以指定仓库中文件使用哪种换行符。它有三个可选值：

- `lf`：表示仓库中文件使用 LF 作为换行符。
- `crlf`：表示仓库中文件使用 CRLF 作为换行符。
- `native`：表示仓库中文件使用当前操作系统默认的换行符。

你可以使用 `git config` 命令来查看或修改 `core.eol` 属性，例如：

```powershell
git config --global core.eol [lf | crlf | native]
```

也可以像上面一样，在 `.gitconfig` 文件中直接编辑 `core.eol` 属性，例如：

```
[core]
	eol = lf
```

#### 恢复之前版本

可以使用 `git reset` 或 `git revert` 命令来恢复之前的版本，具体步骤如下：

- 首先，你需要查看你的提交历史，找到你想要恢复的版本的id，可以使用 `git log` 或 `git reflog` 命令。
- 然后，你可以使用 `git reset --hard` 目标版本id命令来回退到目标版本，这会重置你的本地仓库、暂存区和工作区，使它们与目标版本一致。注意，这会丢弃目标版本之后的所有提交。
- 或者，你可以使用 `git revert -n` 目标版本 id 命令来反做目标版本，这会生成一个新的提交，撤销目标版本的修改，但保留目标版本之后的提交。注意，这可能会导致冲突，需要手动解决。
- 最后，你可以使用 `git push -f` 命令来强制推送你的本地修改到远程仓库，覆盖远程仓库的历史。