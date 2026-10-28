"""Load simple KEY=VALUE settings from the backend .env file."""

import os
from pathlib import Path


def load_environment_file() -> None:
    env_file = Path(__file__).resolve().with_name(".env")
    if not env_file.is_file():
        return

    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[7:].lstrip()
        key, separator, value = line.partition("=")
        key = key.strip()
        if not separator or not key:
            continue

        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        else:
            value = value.split(" #", maxsplit=1)[0].rstrip()
        os.environ.setdefault(key, value)
