#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use bollard::Docker;

#[tauri::command]
async fn get_version() -> bollard::system::Version {
  let docker = Docker::connect_with_socket_defaults().unwrap();

  let version = docker.version().await.unwrap();

  return version;
}

#[tauri::command]
async fn list_images() -> Vec<bollard::service::ImageSummary> {
  let docker = Docker::connect_with_socket_defaults().unwrap();

  let images = &docker
    .list_images(Some(bollard::image::ListImagesOptions::<String> {
      all: true,
      ..Default::default()
    }))
    .await
    .unwrap();

  return images.to_vec();
}

#[tauri::command]
async fn get_info() -> bollard::service::SystemInfo {
  let docker = Docker::connect_with_socket_defaults().unwrap();

  let info = docker
    .info()
    .await
    .unwrap();

  return info;
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_version, list_images, get_info])
    .run(tauri::generate_context!())
    .expect("error while running application");
}
