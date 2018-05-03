#`-file-line-error` is similar to `--interaction nonstopmode`, but shows the concrete line number
#Remove it, it you want pdflatex to stop on errors
$pdflatex = 'pdflatex -shell-escape -file-line-error --synctex=-1 %O %S';

#automatically call pdflatex (instead of latex)
$pdf_mode = 1;

$pdflatex = 'pdflatex -interaction=nonstopmode -shell-escape';

@default_files = ('latex\ManasTalukdar.tex', 'latex\ManasTalukdar_CV.tex', 'latex\ManasTalukdar_vNext.tex');

#remove more files than in the default configuration
@generated_exts = qw(acn acr alg aux code ist fls glg glo gls glsdefs idx ind lof lot out thm toc tpt wrt);

$clean_ext .= ' %R.ist %R.xdy';