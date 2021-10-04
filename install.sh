apt-get update -y
apt-get full-upgrade -y
apt-get dist-upgrade -y
apt-get install git wget curl nano proot* -y
clear
echo "English: Hope You Have Installed And Used X11-repo"
echo "Indonesia: Semoga Kamu Telah Menginstall X11-repo dan menggunakan repository tersebut"
echo "# MechaBots Installer With Ubuntu 21.04 ( PROOT-DISTRO )
DISTRO_NAME="Mecha ( Ubuntu 21.04 )"

TARBALL_URL['aarch64']="https://github.com/termux/proot-distro/releases/download/v2.3.1/ubuntu-aarch64-pd-v2.3.1.tar.xz"
TARBALL_SHA256['aarch64']="599a0af87b110a9eab9f6f84b43243e497a73403397aeddb0d0b3cdb4ea54aa6"
TARBALL_URL['arm']="https://github.com/termux/proot-distro/releases/download/v2.3.1/ubuntu-arm-pd-v2.3.1.tar.xz"
TARBALL_SHA256['arm']="541415c3475bf1e15a1a4e91e2b1291410ed63a1a4b6d403f9096754d8f2bd74"
TARBALL_URL['x86_64']="https://github.com/termux/proot-distro/releases/download/v2.3.1/ubuntu-x86_64-pd-v2.3.1.tar.xz"
TARBALL_SHA256['x86_64']="c728976dcc66eed5ab4cb550c96b9d3169f7a46dd56736732b5eba1c48b6c58e"

distro_setup() {
	# Don't update gvfs-daemons and udisks2
	run_proot_cmd apt-mark hold gvfs-daemons udisks2
    run_proot_cmd clear && echo "Update & Upgrade Ubuntu"
    run_proot_cmd apt-get update -y && apt-get full-upgrade -y
    run_proot_cmd clear && echo "Installing Required Package"
    run_proot_cmd apt-get install git wget curl nano neofetch build-essential libcairo2-dev sudo firefox libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y
    run_proot_cmd apt-get install ffmpeg* -y
    run_proot_cmd apt-get install imagemagick* -y
    run_proot_cmd apt-get install tesseract* -y
    run_proot_cmd clear && echo "Installing Chromium & Nodejs"
    run_proot_cmd apt-get install chromium* -y
    run_proot_cmd ARCHITECTURE=$(dpkg --print-architecture)
case "$ARCHITECTURE" in
aarch64) ARCHITECTURE=arm64;;
arm) ARCHITECTURE=armhf;;
amd64|x86_64) ARCHITECTURE=amd64;;
*)
    run_proot_cmd wget https://launchpad.net/ubuntu/+archive/primary/+files/chromium-browser_85.0.4183.83-0ubuntu2_${ARCHITECTURE}.deb
    run_proot_cmd sudo dpkg --install chromium-browser_85.0.4183.83-0ubuntu2_${ARCHITECTURE}.deb
    run_proot_cmd curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
    run_proot_cmd apt-get install nodejs gcc g++ make -y
}" >> $PREFIX/etc/proot-distro/mecha.sh
proot-distro install mecha
echo "proot-distro login mecha" >> $PREFIX/bin/mecha
clear
echo "English: Everything Has Been Installed You Just Enough  clone from github then npm install & run it"
echo "Indonesia: Semuanya Sudah Terinstal Anda Cukup klon dari github lalu npm install & run"
echo "Type : mecha For Login To Ubuntu"
