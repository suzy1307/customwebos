window.onload = function () {
    const gallery = document.getElementById("gallery");
  
    const supportedExtensions = ['jpg', 'jpeg', 'png', 'mp4'];
  
    fetch("../assets/media/")
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");
        const links = Array.from(htmlDoc.querySelectorAll("a"));
  
        const mediaLinks = links
          .map(a => a.getAttribute("href"))
          .filter(href => supportedExtensions.some(ext => href.endsWith("." + ext)));
  
        if (mediaLinks.length === 0) {
          gallery.innerHTML = `<p style="color: white;">No media found in assets/media/ folder 😢</p>`;
          return;
        }
  
        mediaLinks.forEach(link => {
          const fullPath = `../assets/media/${link}`;
          const ext = link.split('.').pop();
  
          let element;
          if (['jpg', 'jpeg', 'png'].includes(ext)) {
            element = document.createElement("img");
            element.src = fullPath;
          } else if (ext === "mp4") {
            element = document.createElement("video");
            element.src = fullPath;
            element.controls = true;
          }
  
          if (element) {
            element.className = "media-item";
            gallery.appendChild(element);
          }
        });
      })
      .catch(err => {
        console.error("Error loading media:", err);
        gallery.innerHTML = `<p style="color: red;">Error loading media folder!</p>`;
      });
  };
  