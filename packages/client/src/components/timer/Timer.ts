class timer {
  private currentTime: Date | undefined;
  start() {
    this.currentTime = new Date();
    sessionStorage.setItem("gameTime", "0");

    const startDate = new Date();
  }
  pause() {
    const gameTime = sessionStorage.getItem("gameTime");
    console.log(gameTime);
  }
  stop() {
    const gameTime = sessionStorage.getItem("gameTime");
    console.log(gameTime);
  }
}
export default timer;
