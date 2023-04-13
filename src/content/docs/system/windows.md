---
title: "Windows 笔记"
description: "Windows 笔记"
---

### Powershell 增强：命令补全、主题美化及 Git 扩展

#### 查看已安装的模块

```powershell
Get-InstalledModule
```

#### 安装 PSReadLine

PSReadLine 提供了语法高亮、错误提示、多行编辑、键绑定、历史记录搜索等功能：

```powershell
Install-Module PSReadLine 
```

#### 安装 posh-git

posh-git 可以在 PowerShell 中显示 Git 状态信息，并提供 Git 命令的自动补全：

```powershell
Install-Module posh-git
```

#### 安装 Oh My Posh

oh-my-posh 提供了多种自定义主题和配色，可以让 PowerShell 更美观实用：

```powershell
Install-Module oh-my-posh
```

##### 安装字体

Oh My Posh 中使用了很多图标字体，需要正常显示图标，需要安装一个 Nerd 字体，并修改 PowerShell 配置。

```powershell
oh-my-posh font install
```

我这里选择的是 FiraCode，也可以去 [FiraCode GitHub](https://github.com/ryanoasis/nerd-fonts) 下载安装，解压后右键安装。

注意：这里的字体名称可能不是 FiraCode，配置字体的时候可能会报错（我这里就是 FiraCode NF）。可以在 `C:\Windows\Fonts` 查看具体的字体名。

##### 设置主题

主题默认存放路径 `C:\Users\Deshun\AppData\Local\oh-my-posh\themes` ，可以在 [oh My Posh / themes](https://ohmyposh.dev/docs/themes) 提供的 [GitHub](https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes) 下载配置文件。

将下载的配置文件粘贴到主题目录，可以通过以下命令查看可用主题：

```powershell
Get-PoshThemes
```

修改主题（以 [emodipt-extend](https://ohmyposh.dev/docs/themes#emodipt-extend) 为例）：

```powershell
oh-my-posh init pwsh --config 'C:\Users\Deshun\AppData\Local\oh-my-posh\themes\emodipt-extend.omp.json' | Invoke-Expression
```

如果要实现启动 PowerShell 自动加载主题，可以在下面讲到的自定义配置文件中修改主题配置（Set-PoshPrompt）。

#### 配置 PowerShell

文件路径 ‪`C:\Users\<userName>\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json` ，可以在 Powershell 窗口通过快捷键 `Ctrl + Shift + ,` 直接打开配置文件。修改字体配置：

```json
{
  "profiles": {
    "defaults": {
      "font": {
        "face": "FiraCode NF"
      }
    }
  }
}
```

##### 自定义配置

执行以下命令，第一次会显示找不到该文件，选择创建新文件：

```powershell
notepad $profile
```

打开的文件地址是 `C:\Users\<userName>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 。

作用是在 PowerShell 启动时运行一些自定义的设置，比如导入模块、设置别名、定义函数等。

粘贴以下配置内容，可以参考注释根据自己需求修改或者删除：

```json
<#
 * FileName: Microsoft.PowerShell_profile.ps1
 * Author: Deshun
 * Email: 1209278955@qq.com
 * Date: 2023.03.08
 * Copyright: w3h5.com. You can use this code for anything with no warranty.
#>

#------------------------------- Import Modules BEGIN -------------------------------
# 引入 ps-read-line
Import-Module PSReadLine

# 引入 posh-git
Import-Module posh-git

# 引入 oh-my-posh
Import-Module oh-my-posh

# 设置 PowerShell 主题
# Set-PoshPrompt ys
Set-PoshPrompt emodipt-extend
#------------------------------- Import Modules END   -------------------------------

#-------------------------------  Set Hot-keys BEGIN  -------------------------------
# 设置预测文本来源为历史记录
Set-PSReadLineOption -PredictionSource History

# 每次回溯输入历史，光标定位于输入内容末尾
Set-PSReadLineOption -HistorySearchCursorMovesToEnd

# 设置 Tab 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete

# 设置 Ctrl+d 为退出 PowerShell
Set-PSReadlineKeyHandler -Key "Ctrl+d" -Function ViExit

# 设置 Ctrl+z 为撤销
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo

# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
#-------------------------------  Set Hot-keys END    -------------------------------

#-------------------------------    Functions BEGIN   -------------------------------
# Python 直接执行
$env:PATHEXT += ";.py"

# 更新系统组件
function Update-Packages {
	# update pip
	Write-Host "Step 1: 更新 pip" -ForegroundColor Magenta -BackgroundColor Cyan
	$a = pip list --outdated
	$num_package = $a.Length - 2
	for ($i = 0; $i -lt $num_package; $i++) {
		$tmp = ($a[2 + $i].Split(" "))[0]
		pip install -U $tmp
	}

	# update TeX Live
	$CurrentYear = Get-Date -Format yyyy
	Write-Host "Step 2: 更新 TeX Live" $CurrentYear -ForegroundColor Magenta -BackgroundColor Cyan
	tlmgr update --self
	tlmgr update --all

	# update Chocolotey
	Write-Host "Step 3: 更新 Chocolatey" -ForegroundColor Magenta -BackgroundColor Cyan
	choco outdated
}
#-------------------------------    Functions END     -------------------------------
```

保存文件。

#### 修改 VS Code Terminal 字体

PowerShell 配置好后，可以正常显示了，但是在 VS Code 中使用会显示乱码，这是因为 VS Code 中有自己独立的字体配置。

打开设置，找到 Terminal › Integrated: Font Family，修改为：FiraCode NF 即可。