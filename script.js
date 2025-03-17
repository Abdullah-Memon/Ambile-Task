document.addEventListener("DOMContentLoaded", function () {
  const category = document.getElementById("category");
  const siteName = document.getElementById("siteName");
  const nameOfWork = document.getElementById("nameOfWork");
  const numLabour = document.getElementById("numLabour");
  const workProgress = document.getElementById("workProgress");
  const loader = document.getElementById("loader");
  const submitButton = document.getElementById("submitButton");
  const toast = document.getElementById("toast");
  const toastIcon = document.getElementById("toastIcon");
  const dataForm = document.getElementById("dataForm");

  let payload = {};

  const adpOptions = [
    "Missing Allied Facilities of Cultural Complex at Sukkur. (Revised)",
    "Acceleration of Additional Facilities at Culture Center Kamal Dero. (Revised)",
    "Provision of Missing Allied Facilities in Culture Complex at Nawabshah.",
    "Provision of Missing Allied Facilities in Library at K N Shah. (Revised)",
  ];
  const mrOptions = [
    "Sindh Government Library Mirpurkhas",
    "Kadir Bakksh Bedil Public Library Shikarpur",
    "Rahimdad Khan Molai Shaidai Public Library Sukkur Division Headquarter",
    "Sir Shah Nawaz Bhutto Memorial Library Larkana",
  ];
  const workOptions = [
    "Civil Work",
    "Conservation Work",
    "Electrical Work",
    "Plumbing Work",
    "Carpenter Work",
    "External Work",
    "Other Work",
  ];

  category.addEventListener("change", function () {
    siteName.innerHTML =
      category.value === "ADP"
        ? adpOptions
            .map((option) => `<option value="${option}">${option}</option>`)
            .join("")
        : mrOptions
            .map((option) => `<option value="${option}">${option}</option>`)
            .join("");
  });

  nameOfWork.innerHTML = workOptions
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");

  for (let i = 1; i <= 8; i++) {
    numLabour.innerHTML += `<option value="${i}">${i}</option>`;
  }

  for (let i = 0; i <= 100; i += 5) {
    workProgress.innerHTML += `<option value="${i}">${i}%</option>`;
  }

  function showToast(message, type) {
    // Remove classes that hide the toast
    toast.classList.remove(
      "hidden",
      "bg-green-600",
      "bg-yellow-500",
      "bg-red-600",
      "translate-y-[-100%]",
      "opacity-0"
    );
    // Animate toast entry
    toast.classList.add("translate-y-0", "opacity-100");

    // Update the message only in the dedicated span
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.textContent = message;

    // Set the icon and background based on type
    if (type === "success") {
      toast.classList.add("bg-green-600");
      toastIcon.innerHTML =
        '<img src="./assets/success.svg" class="h-5 w-5" />';
    } else if (type === "warning") {
      toast.classList.add("bg-yellow-500");
      toastIcon.innerHTML =
        '<img src="./assets/warning.svg" class="h-5 w-5" />';
    } else {
      toast.classList.add("bg-red-600");
      toastIcon.innerHTML = '<img src="./assets/error.svg" class="h-5 w-5" />';
    }

    // Ensure the toast is visible
    toast.style.display = "flex";

    // Set up auto hide after 3 seconds
    setTimeout(() => {
      hideToast();
    }, 3000);
  }

  function hideToast() {
    toast.classList.add("translate-y-[-100%]", "opacity-0");
    setTimeout(() => {
      toast.classList.add("hidden");
      toast.style.display = "none";
    }, 300);
  }

  // Close button functionality
  document.getElementById("toastClose").addEventListener("click", function () {
    hideToast();
  });

  dataForm.addEventListener("submit", function (e) {
    e.preventDefault();

    payload = {
      category: category.value,
      siteName: siteName.value,
      nameOfWork: nameOfWork.value,
      subCategory: document.getElementById("subCategoryText").value,
      numLabour: numLabour.value,
      workProgress: workProgress.value,
      qualityOfWork: document.getElementById("qualityOfWork").value,
      completionDate: document.getElementById("completionDate").value,
      remarks: document.getElementById("remarks").value,
    };

    submitButton.textContent = "Submitting...";
    submitButton.disabled = true;
    loader.classList.remove("hidden");

    const requiredFields = [
      payload.category,
      payload.siteName,
      payload.nameOfWork,
      payload.subCategory,
      payload.numLabour,
      payload.workProgress,
      payload.qualityOfWork,
      payload.completionDate,
    ];

    if (requiredFields.some((value) => value.trim() === "")) {
      loader.classList.add("hidden");
      submitButton.textContent = "Submit";
      submitButton.disabled = false;
      showToast("Please fill all required fields!", "warning");
      return;
    }

    setTimeout(() => {
      loader.classList.add("hidden");
      showToast("Data has been submitted successfully!", "success");
      submitButton.textContent = "Submit";
      submitButton.disabled = false;
      dataForm.reset();
    }, 2000);
  });
});
