#!/usr/bin/env bash
if [ -d /usr/local/texlive ]; then
  sudo /opt/texbin/tlmgr update --all
else
  cd ../../
  wget https://github.com/scottkosty/install-tl-ubuntu/raw/master/install-tl-ubuntu
  chmod +x ./install-tl-ubuntu
  sudo ./install-tl-ubuntu
  export PATH="/opt/texbin:$PATH"
fi