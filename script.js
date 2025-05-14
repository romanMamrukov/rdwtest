const devices = [
      { width: 1280, height: 800, label: "Desktop (1280x800)", type: "desktop" },
      { width: 375, height: 667, label: "iPhone SE (375x667)", type: "mobile" },
      { width: 390, height: 844, label: "iPhone 13 (390x844)", type: "mobile" },
      { width: 412, height: 915, label: "Pixel 7 (412x915)", type: "mobile" },
      { width: 360, height: 800, label: "Galaxy S20 (360x800)", type: "mobile" }
    ];

    const selector = document.getElementById("device-selector");
    const orientationSelector = document.getElementById("orientation-selector");
    const urlInput = document.getElementById("url-input");
    const loadButton = document.getElementById("load-button");
    const container = document.getElementById("devices");

    // Populate device dropdown
    devices.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = device.label;
      selector.appendChild(option);
    });

    selector.value = "0"; // Default to desktop

    function renderDevice(url, index, orientation = "portrait") {
      container.innerHTML = "";

      const device = devices[index];
      const isLandscape = orientation === "landscape";

      const width = isLandscape ? device.height : device.width;
      const height = isLandscape ? device.width : device.height;

      const wrapper = document.createElement("div");
      wrapper.className = "device-wrapper";
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;

      const iframe = document.createElement("iframe");
      iframe.className = "device-iframe";
      iframe.src = url;

      wrapper.appendChild(iframe);
      container.appendChild(wrapper);

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = `${device.label} - ${orientation}`;
      container.appendChild(label);
    }

    loadButton.addEventListener("click", () => {
      const index = parseInt(selector.value);
      const orientation = orientationSelector.value;
      const url = urlInput.value.trim();

      if (!url) {
        alert("Please enter a URL.");
        return;
      }

      const formattedURL = url.startsWith("http://") || url.startsWith("https://")
        ? url
        : "https://" + url;

      renderDevice(formattedURL, index, orientation);
    });

    // Optional: load default preview
    window.addEventListener("load", () => {
      urlInput.value = "https://romanmamrukov.github.io/romanmamrukov/index.html"; // Example path
      renderDevice(urlInput.value, 0, "portrait");
    });