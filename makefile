SRC_FILES = $(wildcard src/*.js)
LIB_FILES = $(patsubst src/%.js, lib/%.js, $(SRC_FILES))

all: $(LIB_FILES)

lib/%.js: src/%.js lib
	node_modules/.bin/babel $< -o $@

lib:
	mkdir -p lib
