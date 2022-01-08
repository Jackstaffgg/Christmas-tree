import sqlite3


class SQlite:
    def __init__(self, path):
        self.connect = sqlite3.connect(path, check_same_thread=False)
        self.cursor = self.connect.cursor()

    def update_settings(self, args):
        with self.connect:
            self.cursor.execute("UPDATE `tree_settings` SET `preset_id` = ?, `tree_size` = ?, `balls_count` = ?, `is_snowy` = ?, `is_lighting` = ? WHERE `preset_id` = ?", (1, args[0], args[1], args[2], args[3], 1))
    def get_param(self, arg=False):
        settings = {}
        with self.connect:
            a = self.cursor.execute("SELECT * FROM `tree_settings` WHERE `preset_id` = ?", (1, )).fetchone()[1::]
            settings = {
                "tree_size": a[0],
                "balls_count": a[1],
                "is_snowy": a[2],
                "is_lighting": a[3]
                }
            return settings[arg] if arg else settings