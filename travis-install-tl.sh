#!/usr/bin/env bash
if [ -d /usr/local/texlive ]; then
  echo "Cache found."
  sudo /opt/texbin/tlmgr update --all
else
  echo "Cache not found. Will download texlive."
  wget https://github.com/scottkosty/install-tl-ubuntu/raw/master/install-tl-ubuntu
  chmod +x ./install-tl-ubuntu
  sudo ./install-tl-ubuntu
fi