
# Identifying UDID of iOS device

**Using I/O Registry Explorer tool**
```
ioreg -p IOUSB -l | grep "USB Serial"
```

Using ideviceinstaller (macOS and Linux)
```
brew install ideviceinstaller
idevice_id -l
```

Using system_profiler:
```
system_profiler SPUSBDataType | sed -n -e '/iPad/,/Serial/p;/iPhone/,/Serial/p;/iPod/,/Serial/p' | grep "Serial Number:"
```

Instruments:
```
instruments -s devices
```

# Accessing Shell

Access via SSH after Jailbreak

`ssh root@device_ip`

If Wi-Fi is not enabled, this can be done over USB with the following commands

```
iproxy 2222 22
ssh -p 2222 root@localhost
```

# Data Transfer Techniques

## SCP and Archives

```
tar czvf /tmp/data.tgz <DATA_TO_TRANSFER>
scp -P 2222 root@localhost:/tmp/data.tgz
```

## GUIs

iFunbox and iExplorer

## Objection File Management shell

```bash
objection --gadget com.apple.mobilesafari explorer
cd /var/mobile/Containers/Data/Application/72C7AAFB-1D75-4FBA-9D83-D8B4A2D44133/Documents
file download <filename>
```

# Decryption iOS Binaries

Can be done manually, ain't nobody got time for that

## frida-ios-dump

https://github.com/AloneMonkey/frida-ios-dump

```
python3 dump.py -l # Get the app name

python3 dump.py -u "root" -p "alpine" <APP_NAME>
```

## frida-ipa-extract

https://github.com/lautarovculic/frida-ipa-extract


```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

```bash
python extract.py -U -f com.example.app -o MyApp.ipa
python extract.py -U -f com.example.app -o MyApp.ipa --sandbox --no-resume
python extract.py -H 192.168.100.32 -P 2222 -u root -p alpine -f com.example.app
```

- Flags: `-f <bundle>` spawns/attaches (or `--pid` for PID); `-o` sets output name. `-U` uses USB; `-H/-P/-u/-p` opens an SSH tunnel to `frida-server` 27042 and pulls via SFTP (can combine with `-U`). `--sandbox` dumps the sandbox; `--no-resume` keeps the app suspended to avoid crashes and retries via a system process if the session drops.
- Troubleshooting: `Frida attach timed out` → use `-f` or `--no-resume`; `script has been destroyed` → `--no-resume` or SSH transfer; `No running apps found` → start or spawn the app.

## flexdecrypt

https://github.com/JohnCoates/flexdecrypt

```
apt install zip unzip
wget https://gist.githubusercontent.com/defparam/71d67ee738341559c35c684d659d40ac/raw/30c7612262f1faf7871ba8e32fbe29c0f3ef9e27/flexdump -P /usr/local/bin; chmod +x /usr/local/bin/flexdump
flexdump list
flexdump dump Twitter.app
```

# Sideloading

## Cydia Impactor

Tool for signing and installing IPA files on iOS and APK files on Android. https://yalujailbreak.net/how-to-use-cydia-impactor/

## libimobiledevice 
A library for Linux and macOS to communicate with iOS devices. Installation commands and usage examples for ideviceinstaller are provided for installing apps over USB.
    
## ipainstaller 
This command-line tool allows direct app installation on iOS devices.
    
## ios-deploy:
For macOS users, ios-deploy installs iOS apps from the command line. Unzipping the IPA and using the `-m` flag for direct app launch are part of the process.
    
## Xcode 
Utilize Xcode to install apps by navigating to **Window/Devices and Simulators** and adding the app to **Installed Apps**.

