import random

from tree_settings_db import SQlite
db = SQlite("database/settings.db")


print(db.get_settings("tree_size"))
