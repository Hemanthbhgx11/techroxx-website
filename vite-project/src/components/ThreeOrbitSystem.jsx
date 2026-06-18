import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const ThreeOrbitSystem = forwardRef(({ width, height, logoTexture, logoSize, isMobile, hoveredIndex }, ref) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const logoMeshRef = useRef(null);

    // Expose a no-op updatePositions API to the parent (HTML/CSS is the master source)
    useImperativeHandle(ref, () => ({
        updatePositions: () => {
            // No-op
        }
    }));

    useEffect(() => {
        if (width <= 0 || height <= 0) return;

        // 1. Initialize WebGL Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.pointerEvents = 'none';
        
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 2. Initialize Scene & Orthographic Camera (units match wrapper pixels)
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.OrthographicCamera(
            -width / 2,
            width / 2,
            height / 2,
            -height / 2,
            0.1,
            1000
        );
        camera.position.z = 400;
        cameraRef.current = camera;

        // 3. Setup Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
        dirLight.position.set(width / 2, height / 2, 300);
        scene.add(dirLight);

        // 4. Create Logo Mesh (static, centered cylinder)
        const logoRadius = logoSize / 2;
        const logoThickness = Math.max(4, logoRadius * 0.12);
        const logoGeo = new THREE.CylinderGeometry(logoRadius, logoRadius, logoThickness, 64);
        logoGeo.rotateX(Math.PI / 2); // Cylinder flat face to camera

        const texLoader = new THREE.TextureLoader();
        const texture = texLoader.load(logoTexture, () => {
            // Re-render when logo texture loads
            renderer.render(scene, camera);
        });
        texture.colorSpace = THREE.SRGBColorSpace;

        const matFront = new THREE.MeshStandardMaterial({ 
            map: texture,
            roughness: 0.2,
            metalness: 0.1
        });
        const matSide = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.15,
            metalness: 0.8
        });

        const logoMesh = new THREE.Mesh(logoGeo, [matSide, matFront, matFront]);
        logoMesh.position.set(0, 0, 0);
        scene.add(logoMesh);
        logoMeshRef.current = logoMesh;

        // Render the initial static frame
        renderer.render(scene, camera);

        // Cleanup function for resizing / unmounting
        return () => {
            if (logoMeshRef.current) {
                logoMeshRef.current.traverse((child) => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach((m) => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                });
                scene.remove(logoMeshRef.current);
                logoMeshRef.current = null;
            }
            if (rendererRef.current && mountRef.current) {
                if (rendererRef.current.domElement && mountRef.current.contains(rendererRef.current.domElement)) {
                    mountRef.current.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
            }
        };
    }, [width, height, logoTexture, logoSize, isMobile]);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'absolute', 
                inset: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 1, 
                pointerEvents: 'none' 
            }} 
        />
    );
});

ThreeOrbitSystem.displayName = 'ThreeOrbitSystem';

export default ThreeOrbitSystem;
