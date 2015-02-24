all: out.html

out.html: a.js shim.html
	cat shim.html | perl -pe 's/ALARM/`cat a.js`/ge' > out.html

.PHONY: all
