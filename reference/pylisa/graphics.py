"""HARNESS stub for Hummel's pygame graphics module: every attribute is a no-op."""
fps = 30
screen_width = 800
screen_height = 600
update_list = []


def __getattr__(name):
    return lambda *args, **kwargs: None
