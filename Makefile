.PHONY: update
update: update-bun update-fish update-git-freeze update-mak

.PHONY: update-bun
update-bun:
	./script/update-bun.ts

.PHONY: update-fish
update-fish:
	./script/update-fish.ts

.PHONY: update-git-freeze
update-git-freeze:
	./script/update-git-freeze.ts

.PHONY: update-mak
update-mak:
	echo "TODO"

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: clean
clean:
	rm -rf ./.temp

.PHONY: reset
reset: clean
	rm -rf ./node_modules
