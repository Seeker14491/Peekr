yarn build
cd .\src-tauri
cargo +nightly-x86_64-pc-windows-msvc build --release -Z build-std=std,panic_abort -Z build-std-features=panic_immediate_abort --target x86_64-pc-windows-msvc
upx --ultra-brute .\target\x86_64-pc-windows-msvc\release\peekr.exe
