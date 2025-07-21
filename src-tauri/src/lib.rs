

// Import necessary modules from the standard library and the 'lofty' crate.
use std::path::PathBuf;
// Corrected imports for Lofty components as per compiler diagnostics.
use lofty::{read_from_path};
use lofty::prelude::{Accessor, AudioFile};
use lofty::tag::TagType;
// Import the TaggedFileExt trait to bring the `tags()` method into scope.
use lofty::file::TaggedFileExt;
// Import serde for serialization/deserialization between Rust and JavaScript.
use serde::{Serialize};

// Define a struct to hold the parsed song metadata.
// This struct will be serialized to JSON and sent to the frontend.
#[derive(Debug, Serialize)]
pub struct SongMetadata {
    pub title: Option<String>,
    pub artist: Option<String>,
    pub album: Option<String>,
    pub genre: Option<String>,
    pub year: Option<u32>,
    pub track_number: Option<u32>,
    pub disk_number: Option<u32>,
    pub duration_secs: u64,
    pub sample_rate_hz: Option<u32>,
    pub bitrate_kbps: Option<u32>,
    pub channels: Option<u8>, // Changed to Option<u8>
    // Add more fields here as needed
}

// This macro exposes the `parse_metadata` function to the Tauri frontend.
#[tauri::command]
async fn parse_metadata(file_path_str: String) -> Result<SongMetadata, String> {
    // Convert the string path to a PathBuf for better path manipulation.
    let path = PathBuf::from(&file_path_str);

    // Check if the file exists before attempting to read it.
    if !path.exists() {
        return Err(format!("File not found at '{}'", file_path_str));
    }

    // Attempt to read the audio file and its metadata using lofty.
    match read_from_path(&path) {
        Ok(file) => {
            let properties = file.properties();

            // Initialize SongMetadata with default or extracted values.
            let mut metadata = SongMetadata {
                title: None,
                artist: None,
                album: None,
                genre: None,
                year: None,
                track_number: None,
                disk_number: None,
                duration_secs: properties.duration().as_secs(),
                sample_rate_hz: properties.sample_rate(),
                bitrate_kbps: properties.audio_bitrate(),
                channels: properties.channels(), // Now correctly assigned as Option<u8>
            };

            // Iterate through all tags found in the file and populate the metadata struct.
            for tag in file.tags() { // `tags()` method is now available
                // Prioritize tags if multiple types exist, or merge information.
                // For simplicity, we'll just take the first available value for each field.
                if metadata.title.is_none() {
                    metadata.title = tag.title().map(|s| s.to_string());
                }
                if metadata.artist.is_none() {
                    metadata.artist = tag.artist().map(|s| s.to_string());
                }
                if metadata.album.is_none() {
                    metadata.album = tag.album().map(|s| s.to_string());
                }
                if metadata.genre.is_none() {
                    metadata.genre = tag.genre().map(|s| s.to_string());
                }
                if metadata.year.is_none() {
                    metadata.year = tag.year();
                }
                if metadata.track_number.is_none() {
                    metadata.track_number = tag.track();
                }
                if metadata.disk_number.is_none() {
                    metadata.disk_number = tag.disk();
                }
            }

            Ok(metadata)
        },
        Err(e) => {
            // Handle any errors that occurred during reading (e.g., invalid format).
            Err(format!("Error reading audio file: {}", e))
        }
    }
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![parse_metadata])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
