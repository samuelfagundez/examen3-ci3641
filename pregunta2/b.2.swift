import Foundation

actor Store {
    var count: Int = 0
    func sum(amount: Int) {
        count += amount
    }
}

let store = Store()

// Function to count the number of files inside of sourcePath
func countFiles(sourcePath: String) async -> Int {
    let sourcePath = URL(fileURLWithPath: sourcePath, isDirectory: true)
    let fileManager = FileManager.default
    do {
        let files = try fileManager.contentsOfDirectory(at: sourcePath, includingPropertiesForKeys: nil)
        for file in files {
            // If it's a directory, count the files inside of it
            if file.hasDirectoryPath {
                Task {
                    var amount = 0
                    amount = await countFiles(sourcePath: file.path)
                    await store.sum(amount: amount)
                }
            } else {
                await store.sum(amount: 1)
            }
        }
    } catch {
        print("Error: \(error)")
    }
    return await store.count
}

print(countFiles(sourcePath: "/home/samuel/usb/Lenguajes/examen3/examen3-ci3641/pregunta2"))
