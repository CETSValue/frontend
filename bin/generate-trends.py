import json
from datetime import datetime, timedelta
import random

# Parameters
num_weeks = 104  # two years
end_date = datetime.today()
start_date = end_date - timedelta(weeks=num_weeks)

# Generate weekly data
data = []
current_date = start_date
for _ in range(num_weeks):
    entry = {
        "date": current_date.strftime("%Y-%m-%d"),
        "sustainability": int(round(random.uniform(20, 80), 0)),
        "profitability": int(round(random.uniform(0, 20), 0)),
        "resilience": int(round(random.uniform(40, 90), 0)),
        "breakeven": int(round(random.uniform(10, 60), 0)),  # ratio
        "efficiency": int(round(random.uniform(10, 80), 0))
    }
    data.append(entry)
    current_date += timedelta(weeks=1)

# Save to JSON file
file_path = "trend_data.json"
with open(file_path, "w") as f:
    json.dump(data, f, indent=4)

file_path
