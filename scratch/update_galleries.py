import os

projects_dir = "/home/thinif/test_antigravity/projects"
files = [f"project{i}.html" for i in range(2, 8)]

for filename in files:
    filepath = os.path.join(projects_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    project_id = filename.replace(".html", "")
    
    # Target the slider track content
    # We want to replace the 6 items (3 unique + 3 dupe) with 10 items (5 unique + 5 dupe)
    
    old_items = f"""<div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img1.jpg" alt="Project Image 1">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img2.jpg" alt="Project Image 2">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img3.jpg" alt="Project Image 3">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img1.jpg" alt="Project Image 1">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img2.jpg" alt="Project Image 2">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img3.jpg" alt="Project Image 3">
                        </div>"""

    new_items = f"""<div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img1.jpg" alt="Project Image 1">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img2.jpg" alt="Project Image 2">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img3.jpg" alt="Project Image 3">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img4.jpg" alt="Project Image 4">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img5.jpg" alt="Project Image 5">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img1.jpg" alt="Project Image 1">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img2.jpg" alt="Project Image 2">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img3.jpg" alt="Project Image 3">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img4.jpg" alt="Project Image 4">
                        </div>
                        <div class="slider-item">
                            <img src="../assets/images/projects/{project_id}/img5.jpg" alt="Project Image 5">
                        </div>"""

    if old_items in content:
        new_content = content.replace(old_items, new_items)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        # Try with slightly different indentation if needed, but the view_file showed this
        print(f"Could not find target content in {filename}")
