// Initialize Earth
function initEarth() {
    // Get the loading element
    const loadingElement = document.getElementById('loading');

    // Function to hide loading message
    function hideLoading() {
        loadingElement.style.display = 'none';
    }

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Position camera
    camera.position.z = 5;

    // Create Earth geometry and material
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Add texture to Earth (replace with your own Earth texture URL)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg', 
        function(texture) {
            // Create material and mesh
            const material = new THREE.MeshPhongMaterial({
                map: texture,
                bumpScale: 0.05,
                specular: new THREE.Color('grey'),
                shininess: 5
            });

            const earth = new THREE.Mesh(geometry, material);
            scene.add(earth);

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 1);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 3, 5);
            scene.add(directionalLight);

            // Handle window resize
            window.addEventListener('resize', onWindowResize, false);

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);

                // Slowly rotate Earth
                earth.rotation.y += 0.0003;

                renderer.render(scene, camera);
            }

            // Start animation
            animate();

            // Optional: Add smooth initial rotation
            earth.rotation.x = 0.1; // Initial tilt (like Earth's axial tilt)

            // Hide loading message after everything is set up
            hideLoading();
        },
        // Progress callback (optional)
        function(progress) {
            console.log('Load progress:', progress);
        },
        // Error callback
        function(error) {
            console.error('Error loading texture:', error);
            loadingElement.textContent = 'Failed to load Earth';
        }
    );
}

// Initialize the Earth when the page loads
document.addEventListener('DOMContentLoaded', initEarth);