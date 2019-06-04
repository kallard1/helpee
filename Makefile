#include env_make
VERSION ?= 0.0.0-20190528

REPO = selmac
NAME = helpee
INSTANCE = default

.PHONY: build push shell run start stop rm release

build:
	docker build -t ${REPO}/${NAME}:${VERSION} -f docker/node/Dockerfile .

push:
	docker push ${REPO}/${NAME}:${VERSION}

shell:
	docker run --rm --name $(NAME)-$(INSTANCE) -i -t $(PORTS) $(VOLUMES) $(ENV) $(REPO):$(VERSION) /bin/bash

run:
	docker run --rm --name $(NAME)-$(INSTANCE) $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION)

start:
	docker run -d --name $(NAME)-$(INSTANCE) $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION)

stop:
	docker stop $(NAME)-$(INSTANCE)

rm:
	docker rm $(NAME)-$(INSTANCE)

release: build
	make push -e VERSION=$(VERSION)

default: build
