.PHONY: update
update: update-bun update-fish update-git-freeze update-mak update-repo

.PHONY: update-bun
update-bun: setup
	./script/update-bun.ts

.PHONY: update-fish
update-fish: setup
	./script/update-fish.ts

.PHONY: update-git-freeze
update-git-freeze: setup
	./script/update-git-freeze.ts

.PHONY: update-mak
update-mak:
	./script/update-mak.ts

.PHONY: update-repo
update-repo:
	./script/update-mak.ts

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: clean
clean:
	rm -rf ./.temp

.PHONY: reset
reset: clean
	rm -rf ./node_modules

.PHONY: lint
lint:
	bun x @biomejs/biome check

.PHONY: format
format:
	bun x @biomejs/biome check --write

.PHONY: check-versions
check-versions:
	bun run ./script/check-versions.ts

.PHONY: test
test: lint check-versions
