.PHONY: check
check: lint test

.PHONY: update
update: update-bun update-fish update-jj update-git-freeze update-mak update-repo

.PHONY: update-bun
update-bun: setup
	./script/update-bun.ts

.PHONY: update-fish
update-fish: setup
	./script/update-fish.ts

.PHONY: update-jj
update-jj: setup
	./script/update-jj.ts

.PHONY: update-git-freeze
update-git-freeze: setup
	./script/update-git-freeze.ts

.PHONY: update-mak
update-mak: setup
	./script/update-mak.ts

.PHONY: update-repo
update-repo: setup
	./script/update-repo.ts

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
lint: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check
	bun x -- bun-dx --package typescript tsc -- --project .

.PHONY: format
format: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check --write

.PHONY: check-versions
check-versions:
	bun run ./script/check-versions.ts

.PHONY: test
test: check-versions
