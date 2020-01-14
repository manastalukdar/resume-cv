#!/usr/bin/env sh

# Originally from https://github.com/latex3/latex3

# This script is used for testing using Travis
# It is intended to work on their VM set up: Ubuntu 12.04 LTS
# A minimal current TL is installed adding only the packages that are
# required

# See if there is a cached version of TL available
export PATH=/tmp/texlive/bin/x86_64-linux:$PATH
if ! command -v texlua > /dev/null; then
  # Obtain TeX Live
  wget http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
  tar -xzf install-tl-unx.tar.gz
  cd install-tl-20*

  # Install a minimal system
  ./install-tl --profile=../texlive/texlive.profile

  cd ..
fi

# Just including texlua so the cache check above works
# Needed for any use of texlua even if not testing LuaTeX
tlmgr install luatex

# Needed for TeX Live 2017
tlmgr install xkeyval

# A kind of minimum set of packages needed
tlmgr install collection-latex

# Install babel languages
tlmgr install collection-langeuropean

# https://tex.stackexchange.com/questions/328232/what-is-this-mysterious-ecrm1000-missing-file
tlmgr install collection-fontsrecommended

# Index of packages: http://ctan.mirrors.hoobly.com/systems/texlive/tlnet/archive/
# Other contrib packages: done as a block to avoid multiple calls to tlmgr
# pgf includes tikz
tlmgr install   \
  exam          \
  amsmath       \
  amsthm        \
  amssymb       \
  mathtools     \
  enumerate     \
  thmtools      \
  stmaryrd      \
  xcolor        \
  pdfpages      \
  centernot     \
  pgf           \
  cancel        \
  hyperref      \
  bookmark      \
  pgfplots      \
  bm            \
  listings      \
  graphicx      \
  scalerel      \
  stackengine   \
  etoolbox      \
  listofitems   \
  marvosym      \
  amsfonts      \
  opensans      \
  slantsc       \
  fancyhdr      \
  ulem          \
  algorithms    \
  algorithmicx  \
  float         \
  booktabs      \
  enumitem      \
  polynom       \
  fancyvrb      \
  makecmds      \
  multirow      \
  chngcntr      \
  imakeidx      \
  preprint      \
  lm            \
  fontawesome   \
  titlesec      \
  l3packages    \
  l3kernel      \
  fontenc       \
  ragged2e      \
  tex-gyre      \
  pdfescape


# Keep no backups (not required, simply makes cache bigger)
tlmgr option -- autobackup 0

# Update the TL install but add nothing new
tlmgr update --self --all --no-auto-install

# https://tex.stackexchange.com/questions/10062/whats-the-deal-with-tex-live-and-expl3-sty#10070
# https://ctan.org/pkg/