# Android Application for Field Staff

## Purpose:
The purpose of this system is to facilitate field staff in recording information about designated locations identified by TID (Travel ID).

## Target Users:
Field staff members who are equipped with Android smartphones.

## Functionality:
- **Login via Microsoft account:** Users can authenticate themselves using their Microsoft accounts.
- **Record serial number, inventory number, GPS coordinates, full address, and photo of designated locations:** Users can input and save various information about designated locations, including serial numbers, inventory numbers, GPS coordinates, full addresses, and photos.
- **Use OCR technology to extract serial numbers and inventory numbers from photos:** The application utilizes OCR technology to extract relevant information from photos.
- **Use Google Photos to verify coordinates:** Google Photos integration is used to verify coordinates.
- **Store recorded data locally on the device:** Data recorded by users is stored locally on their Android smartphones.
- **Submit recorded data to the backend via API:** Recorded data can be submitted to the backend server via API.
- **Data can be re-collected multiple times until the user is satisfied:** Users have the flexibility to collect and revise data multiple times until they are satisfied.

## Platform:
Android smartphones.

## Performance Requirements:
- The application should efficiently handle OCR processing without significant delays.
- Smooth integration with the device's camera for photo capture.
- Reliable submission of data to the backend, even in low-connectivity environments.

## Security:
- Implement secure authentication using Microsoft accounts.
- Encrypt sensitive data stored locally on the device.
- Use secure API communication for data submission.

## Integration:
- Integrate with backend APIs for data submission and retrieval.

## Usability:
- Provide a user-friendly wizard interface for recording information.
- Ensure intuitive navigation and input methods for field staff.
