document.addEventListener("DOMContentLoaded", () => {
  // Immediately hide loader
  let loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0"; // Trigger fade-out animation
  }

  // Then proceed with Firebase logic
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const timetableRef = ref(database, `users/${userId}/timetable`);

      get(timetableRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Restore task/period cells
          for (const day in data) {
            if (day !== "Times") {
              for (const period in data[day]) {
                const id = day + period.replace("Period", "");
                const element = document.getElementById(id);
                if (element) {
                  element.value = data[day][period];
                }
              }
            }
          }

          // Restore time input fields
          if (data["Times"]) {
            for (let i = 1; i <= 7; i++) {
              const periodTime = data["Times"][`Period${i}`];
              if (periodTime) {
                const timeStart = document.getElementById(`time${i * 2 - 1}`);
                const timeEnd = document.getElementById(`time${i * 2}`);
                if (timeStart && timeEnd) {
                  timeStart.value = periodTime.start || "";
                  timeEnd.value = periodTime.end || "";
                }
              }
            }
          }

          console.log("✅ Timetable restored successfully!");
          console.log("%c-Page loaded-", "background-color: green; font-size: 20px; color: white; border-radius: 5px;");
        } else {
          console.log("📭 No timetable data found for this user.");
        }
      }).catch((error) => {
        console.error("❌ Error restoring timetable:", error);
      });
    } else {
      console.log("🚫 No user signed in.");
    }
  });
});
