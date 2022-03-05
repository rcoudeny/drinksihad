# Server #
This is the node js with typescript backend for the app
# TODO #

- [x] Add authentication
  - [x] Creating user with password and hash
  - [x] Logging in with tokenservice (maybe use JWT-tokens?)
- [ ] Create a group
  - [ ] Invite users to group 
    - [ ] (share group code) -> 
    - [ ] Invite email
      - [ ] If exists -> send request to existing user
      - [ ] If not exists -> send email to mailadress
  - [ ] Add drink to group with pricing
  - [ ] Users should be able to edit number of drinks